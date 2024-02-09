import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../lib/store";
import { useNavigate } from "@tanstack/react-router";
import { useCasinoApi } from "./casino-api-context";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginFormSchema = z.object({
	username: z.string().min(1, { message: "A username is required" }),
	password: z.string().min(1, { message: "A password is required" }),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export function LoginForm() {
	const form = useForm<LoginForm>({
		resolver: zodResolver(loginFormSchema),
	});

	const { isLoading, error, login } = useAuthStore();
	const casinoApi = useCasinoApi();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<LoginForm> = async (data) => {
		const success = await login(casinoApi.login, data.username, data.password);
		if (success) {
			await navigate({
				to: "/casino/explore",
			});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="casino-king-1337" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="mb-2">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="********" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isLoading}>
					Log In
				</Button>
			</form>
		</Form>
	);
}
