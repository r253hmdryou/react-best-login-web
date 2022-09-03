import { Header } from "@/components/layouts/Header";

type Props = {
  children: React.ReactNode;
}

export function GenericTemplate(props: Props) {
	return (
		<div>
			<Header />
			<main>
				{props.children}
			</main>
		</div>
	);
}
