import { useState, useRef } from "react";
import type { FormEvent } from "react";
import type { Fields, Touched, Errors } from "../types/Contact";

export default function ContactSection() {
	const [fields, setFields] = useState<Fields>({
		name: "",
		email: "",
		message: "",
	});

	const [touched, setTouched] = useState<Touched>({
		name: false,
		email: false,
		message: false,
	});

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLTextAreaElement>(null);

	// Validation
	function validate(data: Fields): Errors {
		const errors: Errors = {};

		if (!data.name.trim()) {
			errors.name = "Please enter your name.";
		} else if (data.name.length < 2) {
			errors.name = "Name must be at least 2 characters long.";
		}

		if (!data.email.trim()) {
			errors.email = "Email address is required.";
		} else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
			errors.email = "Please enter a valid email address.";
		}

		if (!data.message.trim()) {
			errors.message = "Please enter your message.";
		} else if (data.message.length < 10) {
			errors.message = "Message must be at least 10 characters long.";
		}

		return errors;
	}

	const allErrors = validate(fields);

	// Show errors only for touched fields
	const visibleErrors: Errors = {
		name: touched.name ? allErrors.name : undefined,
		email: touched.email ? allErrors.email : undefined,
		message: touched.message ? allErrors.message : undefined,
	};

	function handleSubmit(event: FormEvent) {
		event.preventDefault();

		setTouched({
			name: true,
			email: true,
			message: true,
		});

		if (allErrors.name) {
			nameRef.current?.focus();
			return;
		}
		if (allErrors.email) {
			emailRef.current?.focus();
			return;
		}
		if (allErrors.message) {
			messageRef.current?.focus();
			return;
		}

		console.log("Form submitted:", fields);
		setFields({
			name: "",
			email: "",
			message: "",
		});
		setTouched({
			name: false,
			email: false,
			message: false,
		});
	}

	return (
		<section className="flex items-center justify-center py-16 px-4">
			<div className="grid md:grid-cols-2 gap-10 lg:gap-20 max-w-7xl w-full items-center">
				{/* Form */}
				<div className="p-6 bg-surface border border-border rounded-2xl">
					<h1 className="text-3xl font-heading font-semibold text-text mb-3">
						Get in touch
					</h1>

					<p className="text-sm text-text-muted mb-8 max-w-md">
						Questions about sizing, orders, or returns? We’re
						here to help.
					</p>

					<form onSubmit={handleSubmit} noValidate>
						{/* Name */}
						<div className="mb-5">
							<label className="block text-sm text-text-muted mb-2">
								Name
							</label>
							<input
								ref={nameRef}
								type="text"
								value={fields.name}
								onChange={(e) =>
									setFields({
										...fields,
										name: e.target.value,
									})
								}
								onBlur={() =>
									setTouched({
										...touched,
										name: true,
									})
								}
								className={`w-full px-3 py-3 border rounded-lg text-sm bg-background outline-none transition-colors
									${visibleErrors.name ? "border-danger" : "border-border focus:border-primary"}`}
							/>
							{visibleErrors.name && (
								<p className="mt-1 text-sm text-danger">
									{visibleErrors.name}
								</p>
							)}
						</div>

						{/* Email */}
						<div className="mb-5">
							<label className="block text-sm text-text-muted mb-2">
								Email address
							</label>
							<input
								ref={emailRef}
								type="email"
								value={fields.email}
								onChange={(e) =>
									setFields({
										...fields,
										email: e.target.value,
									})
								}
								onBlur={() =>
									setTouched({
										...touched,
										email: true,
									})
								}
								className={`w-full px-3 py-3 border rounded-lg text-sm bg-background outline-none transition-colors
									${visibleErrors.email ? "border-danger" : "border-border focus:border-primary"}`}
							/>
							{visibleErrors.email && (
								<p className="mt-1 text-sm text-danger">
									{visibleErrors.email}
								</p>
							)}
						</div>

						{/* Message */}
						<div className="mb-6">
							<label className="block text-sm text-text-muted mb-2">
								Message
							</label>
							<textarea
								ref={messageRef}
								rows={4}
								value={fields.message}
								onChange={(e) =>
									setFields({
										...fields,
										message: e.target.value,
									})
								}
								onBlur={() =>
									setTouched({
										...touched,
										message: true,
									})
								}
								className={`w-full px-3 py-3 border rounded-lg text-sm bg-background outline-none resize-y transition-colors
									${visibleErrors.message ? "border-danger" : "border-border focus:border-primary"}`}
							/>
							{visibleErrors.message && (
								<p className="mt-1 text-sm text-danger">
									{visibleErrors.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							className="w-full py-3.5 rounded-lg text-sm font-medium text-text-inverse
								bg-linear-to-br from-primary to-primary-dark
								transition-all hover:-translate-y-0.5
								hover:shadow-[0_10px_20px_var(--color-primary)/30]"
						>
							Send message
						</button>
					</form>
				</div>

				{/* Image Panel */}
				<div className="rounded-3xl relative min-h-165.5 w-full max-w-130 hidden md:flex overflow-hidden">
					<img
						src="https://www.thenomadstudio.com/wp-content/uploads/2021/10/Vertical-shoe-rack-12.jpg"
						alt="Brand visual"
						className="absolute inset-0 w-full h-full object-cover"
					/>
				</div>
			</div>
		</section>
	);
}
