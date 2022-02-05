import React from "react";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import {
	createMemoryHistory,
	MakeGenerics,
	Outlet,
	ReactLocation,
	Router,
	useMatch,
} from "@tanstack/react-location";
import { Link } from "./Link";
import { fetchPostById, fetchPosts } from "./api";
import { ErrorBoundary } from "react-error-boundary";

type PostType = {
	id: string;
	title: string;
	body: string;
};

type LocationGenerics = MakeGenerics<{
	LoaderData: {
		posts: PostType[];
		post: PostType;
	};
}>;

const history = createMemoryHistory();
const reactLocation = new ReactLocation({ history });

const App = () => {
	const isDarkMode = useColorScheme() === "dark";

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<ErrorBoundary fallback={<Text>An error occured...</Text>}>
				<Router
					location={reactLocation}
					// useErrorBoundary is required as react-location has built in error rendering in dev nide that uses DOM elements
					useErrorBoundary
					routes={[
						{ path: "/", element: <Index /> },
						{
							path: "posts",
							element: <Posts />,
							loader: async () => {
								return {
									posts: await fetchPosts(),
								};
							},
							children: [
								{ path: "/", element: <PostsIndex /> },
								{
									path: ":postId",
									element: <Post />,
									loader: async ({ params: { postId } }) => {
										return {
											post: await fetchPostById(postId),
										};
									},
								},
							],
						},
					]}
				>
					<Link to="/" title="Home" getActiveProps={getActiveProps} />
					<Link to="posts" title="Posts" getActiveProps={getActiveProps} />
					<View style={styles.sectionContainer}>
						<Outlet />
					</View>
				</Router>
			</ErrorBoundary>
		</SafeAreaView>
	);
};

function Index() {
	return (
		<View>
			<Text style={styles.heading3}>Welcome Home!</Text>
		</View>
	);
}

function Posts() {
	const {
		data: { posts },
	} = useMatch<LocationGenerics>();

	return (
		<View>
			<View>
				{posts?.map((post) => {
					return (
						<View key={post.id}>
							<Link
								to={post.id}
								title={post.title}
								getActiveProps={getActiveProps}
							/>
						</View>
					);
				})}
			</View>
			<Hr />
			<Outlet />
		</View>
	);
}

function PostsIndex() {
	return (
		<>
			<Text>Select an post.</Text>
		</>
	);
}

function Post() {
	const {
		data: { post },
	} = useMatch<LocationGenerics>();

	return (
		<View>
			{post ? (
				<>
					<Text style={styles.heading4}>{post.title}</Text>
					{post.body ? <Text>{post.body}</Text> : null}
				</>
			) : (
				<Text>Post not found</Text>
			)}
		</View>
	);
}

function Hr() {
	return <View style={styles.hr} />;
}

function getActiveProps() {
	return {
		style: {
			fontWeight: "bold",
		},
	};
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	heading3: {
		fontSize: 22,
	},
	heading4: {
		fontSize: 16,
	},
	hr: {
		marginBottom: 10,
		borderBottomColor: "black",
		borderBottomWidth: 2,
	},
});

export default App;
