import React from "react";
import {
	useNavigate,
	DefaultGenerics,
	LinkProps as ReactLocationLinkProps,
} from "@tanstack/react-location";
import { Button } from "react-native";

export interface LinkProps<TGenerics>
	extends ReactLocationLinkProps<TGenerics> {
	title: string;
}

/**
 * Quick and dirty Link implementation.
 * Doesn't support active/inactive features or preloading.
 */
export function Link<
	TGenerics extends Partial<DefaultGenerics> = DefaultGenerics
>(props: LinkProps<TGenerics>) {
	const navigate = useNavigate<TGenerics>();

	return <Button title={props.title} onPress={() => navigate(props)} />;
}
