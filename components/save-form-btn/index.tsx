import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesignerContext from "@/hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "../ui/use-toast";
import { FaSpinner } from "react-icons/fa";
function SaveFormBtn({id}:{id:number}) {
	const { elements } = useDesignerContext();
	const [loading, startTransition ] = useTransition();
	const updateContent = async () => {
		try {
			const JsonElements = JSON.stringify(elements);
			await UpdateFormContent(id, JsonElements);
			toast({
				title: "Success",
				description: "Form Saved successfully",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong, Please try again",
				variant: "destructive",
			});
		}
	};
	return (
		<Button variant={"outline"} className='gap-2' disabled={loading} onClick={() => startTransition(updateContent)}>
			<HiSaveAs />
			Save
			{loading && <FaSpinner className='animate-spin' />}
		</Button>
	);
}

export default SaveFormBtn;
