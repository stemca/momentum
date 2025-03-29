import { signOutAction } from "@/features/auth/actions";
import { Button } from "./ui/button";

export default function LogoutButton() {
	return (
		<form action={signOutAction}>
			<Button type="submit">Sign Out</Button>
		</form>
	);
}
