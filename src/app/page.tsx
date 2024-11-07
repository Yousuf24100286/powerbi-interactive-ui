import { DataTransferForm } from './_componenets/data-transfer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database } from 'lucide-react'

export default function Page() {
  return (
		<div className="p-4 mx-4 my-8 rounded-lg border-2 border-border shadow-md bg-white flex flex-col gap-4">
			<span className="flex flex-row gap-2 items-center">
				<Database size={24} />
				<h1 className="text-2xl font-bold leading-none">PowerBI Data Management</h1>
			</span>
			<Tabs defaultValue="data-transfer" className="w-full">
				<TabsList className="w-full">
					<TabsTrigger value="data-transfer" className="flex-grow">Data Transfer</TabsTrigger>
					<TabsTrigger value="history" className="flex-grow">History</TabsTrigger>
				</TabsList>
				<div>
					<TabsContent value="data-transfer">
						<DataTransferForm />
					</TabsContent>
					<TabsContent value="history">
						<p>Content for History</p>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	)
}