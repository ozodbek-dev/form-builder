import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { MdOutlinePublish } from "react-icons/md";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "../ui/alert-dialog";
import { FaSpinner } from "react-icons/fa";
import { toast } from "../ui/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";
function PublishFormBtn({ id }: { id: number }) {
	const [loading, startTransition] = useTransition();
	const router = useRouter();
	async function publishForm() {
		try {
			await PublishForm(id);
			toast({
				title: "Form Published successfully",
				description: "Your form is now available to the public",
			});
			router.refresh();
		} catch (error) {
			toast({
				title: "Error",
				description: "Something went wrong, Please try again",
				variant: "destructive",
			});
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button className='gap-2 bg-gradient-to-r from bg-indigo-400 to-cyan-400'>
					<MdOutlinePublish />
					Publish
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you Absolutely Sure ?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. After publishing you will not be able to edit this form. <br />
						<br />
						<span>
							By Publishing this form you will make it available to the public and you will be able to collect submissions
						</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={e => {
							e.preventDefault();
							startTransition(publishForm);
						}}
					>
						Proceed {loading && <FaSpinner className='animate-spin' />}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default PublishFormBtn;
