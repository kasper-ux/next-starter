import { BaseProvider, ProviderConfig } from '@utils/providers/BaseProvider'
import type { AppProps } from 'next/app'

const appProviders: ProviderConfig = {
	authentication: false,
	firestore: false
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<BaseProvider providers={appProviders}>
			<Component {...pageProps} />
		</BaseProvider>
	)
}