"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form.schema";
import { currentUser } from "@clerk/nextjs";
class UserNotFoundError extends Error {}

export async function GetFormStats() {
	const user = await currentUser();
	if (!user) {
		throw new UserNotFoundError();
	}

	const stats = await prisma.form.aggregate({
		where: {
			userId: user.id,
		},
		_sum: {
			visits: true,
			submissions: true,
		},
	});

	const visits = stats._sum.visits || 0;
	const submissions = stats._sum.submissions || 0;
	let submissioinsRete = 0;
	if (visits > 0) {
		submissioinsRete = (submissions / visits) * 100;
	}

	const bounceRate = 100 - submissioinsRete;

	return {
		visits,
		submissions,
		submissioinsRete,
		bounceRate,
	};
}

export async function CreateForm(data: formSchemaType) {
	const validation = formSchema.safeParse(data);
	if (!validation.success) {
		throw new Error(validation?.error?.message || "Form not valid!");
	}

	const user = await currentUser();
	if (!user) {
		throw new UserNotFoundError();
	}

	const { name, description } = data;

	const form = await prisma.form.create({
		data: {
			name: name,
			description: description,
			userId: user.id,
		},
	});

	if (!form) {
		throw new Error("Form not created!");
	}
	return form.id;
}

export async function GetForms() {
	const user = await currentUser();
	if (!user) {
		throw new UserNotFoundError();
	}

	return await prisma.form.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}

export async function GetFormById(id: number) {
	const user = await currentUser();
	if (!user) {
		throw new UserNotFoundError();
	}

	return prisma.form.findUnique({
		where: {
			id: id,
		},
	});
}

export async function UpdateFormContent(id: number, jsonContent: string) {
	const user = await currentUser();
	if (!user) {
		throw new UserNotFoundError();
	}

	return await prisma.form.update({
		where: {
			userId: user.id,
			id,
		},
		data: {
			content: jsonContent,
		},
	}); 
}

export async function PublishForm(id: number) {
	const user = await currentUser();
	if (!user) {
		throw new UserNotFoundError();
	}
	return await prisma.form.update({
		where: {
			id: id,
		},
		data: {
			published: true,
		},
	});
}
