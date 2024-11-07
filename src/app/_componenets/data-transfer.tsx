'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/components/ui/select'
import { Database, Folder } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const DataTransferFormSchema = z.object({
	workspaceId: z.string(),
	datasetId: z.string(),
	tables: z.array(z.string())
})
type TDataTransferFormValues = z.infer<typeof DataTransferFormSchema>


export function DataTransferForm() {
	
	const form = useForm<TDataTransferFormValues>({
		resolver: zodResolver(DataTransferFormSchema),
		defaultValues: {
			workspaceId: undefined,
			datasetId: undefined,
			tables: []
		}
	})
	const handleSubmit = form.handleSubmit((values) => {
		console.log(values)
	})

	const tables = [
		'Orders',
		'Customers',
		'Products',
		'Transactions',
		'Inventory',
	]
	
	return (
		<div>
			<Form {...form}>
				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<FormField 
						control={form.control}
						name='workspaceId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<span className='flex flex-row gap-1'>
										<Folder size={16} /> Choose Workspace
									</span>
								</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue  placeholder="Select workspace"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">Workspace 1</SelectItem>
											<SelectItem value="2">Workspace 2</SelectItem>
											<SelectItem value="3">Workspace 3</SelectItem>
											<SelectItem value="4">Workspace 4</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='datasetId'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<span className='flex flex-row gap-1'>
										<Database size={16} /> Select Dataset
									</span>
								</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Select dataset"/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">Dataset 1</SelectItem>
											<SelectItem value="2">Dataset 2</SelectItem>
											<SelectItem value="3">Dataset 3</SelectItem>
											<SelectItem value="4">Dataset 4</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='tables'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<span className='flex flex-row gap-1'>
										<Database size={16} /> Select Tables
									</span>
								</FormLabel>
								<FormControl>
									<div className='border w-full rounded-md grid grid-cols-2 lg:grid-cols-3 gap-2 p-4'>
										{
											tables.map((table, index) => (
												<span  key={index} className='flex flex-row gap-1'>
													<Checkbox
													checked={field.value.includes(table)}
													onCheckedChange={(checked) => {
														if (checked) {
															field.value = [...field.value, table]
															field.onChange(field.value)
														} else {
															field.value = field.value.filter((t) => t !== table)
															field.onChange(field.value)
														}
													}} />
													<Label>{table}</Label>
												</span>
											))
										}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	)
}