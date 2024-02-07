export function LoginForm() {
	return (
		<div className="login" style={{ display: "block" }}>
			<div className="ui grid centered">
				<form>
					<div className="fields">
						<div className="required field">
							<div className="ui icon input">
								<input type="text" name="username" placeholder="Username" />
								<i className="user icon" />
							</div>
						</div>
						<div className="required field">
							<div className="ui icon input">
								<input type="password" name="password" placeholder="Password" />
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
		</div>
	);
}
