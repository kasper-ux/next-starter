import { ReactElement, isValidElement } from "react";
import FirestoreProvider from "./FirestoreProvider"
import AuthenticationProvider from "./AuthenticationProvider";

type Props = {
	children: JSX.Element,
	providers: ProviderConfig
}

type ProviderElement = ({ children }: { children: any; }) =>
	JSX.Element

const _providers: {
	[provider: string]: ProviderElement
} = {
	firestore: FirestoreProvider,
	authentication: AuthenticationProvider,
}

export type ProviderConfig = {
	firestore?: boolean,
	authentication?: boolean,
};

export const BaseProvider = ({ children, providers }: Props) =>
	Object.entries(providers).reduce(
		(acc, [providerName, _]) => {
			if (providers[providerName as keyof ProviderConfig] == true) {
				const Provider = _providers[providerName];
				return <Provider>{acc}</Provider>
			}
			return acc;
		},
		children
	);
