import React from "react";
import {
	useNavigate,
	DefaultGenerics,
	LinkProps,
} from "@tanstack/react-location";
import { Button } from "react-native";

export function Link<
	TGenerics extends Partial<DefaultGenerics> = DefaultGenerics
>(props: LinkProps<TGenerics> & { title: string }) {
	const navigate = useNavigate<TGenerics>();

	return <Button title={props.title} onPress={() => navigate(props)} />;
}
