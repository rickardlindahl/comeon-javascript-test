import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../lib/store";
import { useNavigate } from "@tanstack/react-router";

const loginFormSchema = z.object({
	username: z.string().min(1, { message: "A username is required" }),
	password: z.string().min(1, { message: "A password is required" }),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginForm>({
		resolver: zodResolver(loginFormSchema),
	});

	const { error, login } = useAuthStore();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<LoginForm> = async (data) => {
		const success = await login(data.username, data.password);
		console.log({ success });
		if (success) {
			reset();
			// redirect
			await navigate({
				to: "/games",
			});
		}
	};

	return (
		<div className="login" style={{ display: "block" }}>
			<div className="ui grid centered">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="fields">
						<div className="required field">
							<div className="ui icon input">
								<input
									type="text"
									id="username"
									placeholder="Username"
									{...register("username", { required: true })}
								/>
								<i className="user icon" />
							</div>
						</div>
						<div className="required field">
							<div className="ui icon input">
								<input
									type="password"
									id="password"
									placeholder="Password"
									{...register("password", { required: true })}
								/>
								<i className="lock icon" />
							</div>
						</div>
						<div className="field">
							<div className="ui icon input">
								<input type="submit" value="Login" />
								<i className="right chevron icon" />
							</div>
						</div>
					</div>
				</form>
			</div>
			{errors.username && <p>{errors.username.message}</p>}
			{errors.password && <p>{errors.password.message}</p>}
			{error && <p>{error}</p>}
		</div>
	);
}
