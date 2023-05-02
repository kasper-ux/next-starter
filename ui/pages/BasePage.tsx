import Head from 'next/head';
import styled from 'styled-components';

type Props = {
	title: string,
	description?: string,
	children?: any,
}

export default function BasePage({
	title,
	description,
	children,
}: Props) {

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Content>
				{children}
			</Content>
		</>
	);
}

const Content = styled.main``