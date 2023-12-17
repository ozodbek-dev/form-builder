import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/form-builder";
import React from "react";

export default async function BuilderPage({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const form = await GetFormById(Number(params.id));
	if (!form) throw Error("Form not found");

	return <>Form detailes</>;
}
