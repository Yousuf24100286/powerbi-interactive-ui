'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from '@/components/ui/select'
import { Database, Folder } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const DataTransferFormSchema = z.object({
	workspaceId: z.string(),
	datasetId: z.string(),
	tables: z.array(z.string()),
	schemaTemplate: z.string().optional(),
	timeStamp: z.date().optional(),
	tags: z.array(z.string()).optional()
})
type TDataTransferFormValues = z.infer<typeof DataTransferFormSchema>


export function DataTransferForm() {
	
	const form = useForm<TDataTransferFormValues>({
		resolver: zodResolver(DataTransferFormSchema),
		defaultValues: {
			workspaceId: undefined,
			datasetId: undefined,
			tables: [],
			schemaTemplate: undefined,
			timeStamp: new Date(),
			tags: []
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
	const schemas: {
		[key: string]: string
	} = {
		'Schema 1': `CREATE TABLE Orders (
			order_id INT PRIMARY KEY,
			customer_id INT,
			product_id INT,
			quantity INT,
			price DECIMAL(10, 2),
			order_date DATE
		);`,
		'Schema 2': `CREATE TABLE Customers (
			customer_id INT PRIMARY KEY,
			first_name VARCHAR(255),
			last_name VARCHAR(255),
			email VARCHAR(255),
			phone VARCHAR(255),
			created_at DATE
		);`,
	}

	const schemaController = useController({
		name: 'schemaTemplate',
		control: form.control
	})
	
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
					<FormItem>
						<FormLabel>
							Choose Schema Template
						</FormLabel>
						<FormControl>
							<Select onValueChange={schemaController.field.onChange} value={schemaController.field.value}>
								<SelectTrigger>
									<SelectValue placeholder="Select schema template"/>
								</SelectTrigger>
								<SelectContent>
									{
										Object.entries(schemas).map(([key]) => (
											<SelectItem key={key} value={key}>{key}</SelectItem>
										))
									}
								</SelectContent>
							</Select>
						</FormControl>
						<FormMessage />
					</FormItem>
					<div>
						<Label>Schema Preview</Label>
						<div className='border bg-accent w-full rounded-md h-80 overflow-y-scroll'>
							{
								schemaController.field.value && (
									<pre className='p-4'>{schemas[schemaController.field.value]}</pre>
								)
							}
						</div>
					</div>
					<FormField
						control={form.control}
						name='timeStamp'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Current Timestamp
								</FormLabel>
								<FormControl>
									<p className='text-sm text-muted-foreground'>{field.value?.toLocaleString()}&nbsp;(automatically added to the schema)</p>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='tags'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<span className='flex flex-row gap-1'>
										Tags
									</span>
								</FormLabel>
								<FormControl>
									<Input {...field} 
										placeholder='Add tags' 
										value={field.value?.join(',')}
										onChange={(e) => {
											field.value = e.target.value.split(',')
											field.onChange(field.value)
										}}
									/>
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