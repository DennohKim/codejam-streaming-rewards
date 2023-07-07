'use client'
// This component is used to add a Employee to the marketplace and show the user's cUSD balance

// Importing the dependencies
// import ethers to convert the Employee Salary to wei
import { ethers } from 'ethers'
// Import the useAccount and useBalance hooks to get the user's address and balance
import { useAccount } from 'wagmi'
// Import the toast library to display notifications
import { toast } from 'react-toastify'
// Import the useDebounce hook to debounce the input fields
import { useDebounce } from 'use-debounce'
import { useEffect, useState } from 'react'

// The AddEmployeeModal component is used to add a Employee to the marketplace
const AddEmployeeModal = () => {
	// The visible state is used to toggle the modal
	const [visible, setVisible] = useState(false)
	// The following states are used to store the values of the form fields
	const [employeeName, setEmployeeName] = useState('')
	const [employeeSalary, setEmployeeSalary] = useState<string | number>(0)
	const [employeeWalletAddress, setEmployeeWalletAddress] = useState('')
	const [employeePaymentMethod, setEmployeePaymentMethod] = useState('')
	// The following states are used to store the debounced values of the form fields
	const [debouncedEmployeeName] = useDebounce(employeeName, 500)
	const [debouncedEmployeeSalary] = useDebounce(employeeSalary, 500)
	const [debouncedEmployeeWalletAddress] = useDebounce(employeeWalletAddress, 500)
	const [debouncedEmployeePaymentMethod] = useDebounce(employeePaymentMethod, 500)
	// The loading state is used to display a loading message
	const [loading, setLoading] = useState('')

	// Check if all the input fields are filled
	const isComplete = employeeName && employeeSalary && employeeWalletAddress && employeePaymentMethod

	// Clear the input fields after the Employee is added to the marketplace
	const clearForm = () => {
		setEmployeeName('')
		setEmployeeSalary(0)
		setEmployeeWalletAddress('')
		setEmployeePaymentMethod('')
	}

	// Convert the Employee Salary to wei
	const EmployeeSalaryInWei = ethers.utils.parseEther(debouncedEmployeeSalary.toString())

	// Use the useContractSend hook to use our writeEmployee function on the marketplace contract and add a Employee to the marketplace
	const createEmployee = {
		debouncedEmployeeName,
		debouncedEmployeeWalletAddress,
		debouncedEmployeePaymentMethod,
		EmployeeSalaryInWei,
	}

	// Define function that handles the creation of a Employee through the marketplace contract
	const handleCreateEmployee = async () => {
		if (!createEmployee) {
			throw 'Failed to create Employee'
		}
		setLoading('Creating...')
		if (!isComplete) throw new Error('Please fill all fields')
		// Create the Employee by calling the writeEmployee function on the marketplace contract
		// const purchaseTx = await createEmployee()
		setLoading('Waiting for confirmation...')
		// Wait for the transaction to be mined
		// await purchaseTx.wait()
		// Close the modal and clear the input fields after the Employee is added to the marketplace
		setVisible(false)
		clearForm()
	}

	// Define function that handles the creation of a Employee, if a user submits the Employee form
	const addEmployee = async (e: any) => {
		e.preventDefault()
		try {
			// Display a notification while the Employee is being added to the marketplace
			await toast.promise(handleCreateEmployee(), {
				pending: 'Creating Employee...',
				success: 'Employee created successfully',
				error: 'Something went wrong. Try again.',
			})
			// Display an error message if something goes wrong
		} catch (e: any) {
			console.log({ e })
			toast.error(e?.message || 'Something went wrong. Try again.')
			// Clear the loading state after the Employee is added to the marketplace
		} finally {
			setLoading('')
		}
	}


	// Define the JSX that will be rendered
	return (
		<div className={'flex flex-row w-full justify-between'}>
			<div>
				{/* Add Employee Button that opens the modal */}
				<button
					type="button"
					onClick={() => setVisible(true)}
					className="inline-block ml-4 px-6 py-2.5 border-2 border-border text-neutral-700 font-medium text-md leading-tight rounded-lg shadow-md hover:bg-black hover:text-white hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
					data-bs-toggle="modal"
					data-bs-target="#exampleModalCenter"
				>
					Add Employee
				</button>

				{/* Modal */}
				{visible && (
					<div className="fixed z-40 overflow-y-auto top-0 w-full left-0" id="modal">
						{/* Form with input fields for the Employee, that triggers the addEmployee function on submit */}
						<form onSubmit={addEmployee}>
							<div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
								<div className="fixed inset-0 transition-opacity">
									<div className="absolute inset-0 bg-gray-900 opacity-75" />
								</div>
								<span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
								<div
									className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
									role="dialog"
									aria-modal="true"
									aria-labelledby="modal-headline"
								>
									{/* Input fields for the Employee */}
									<div className="bg-white flex flex-col space-y-3 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
										<div>
											<label>Employee Name</label>
											<input
												onChange={e => {
													setEmployeeName(e.target.value)
												}}
												required
												type="text"
												className="w-full bg-gray-100 p-2 mt-2 mb-3"
											/>
										</div>
										<div>
											<label>Employee Wallet Address</label>
											<input
												onChange={e => {
													setEmployeeWalletAddress(e.target.value)
												}}
												required
												type="text"
												className="w-full bg-gray-100 p-2 mt-2 mb-3"
											/>
										</div>
										<div className='flex flex-col space-y-1'>
											<label>Employee Payment Method</label>
											<select
												value={employeePaymentMethod}
												onChange={e => {
													setEmployeePaymentMethod(e.target.value)
												}}
												className='py-2.5'
											>
												<option defaultValue="Select token">Select token</option>
												<option value="cusd">cUSD</option>
												<option value="celo">Celo</option>
											</select>
										</div>

										<div>
											<label>Employee Salary (cUSD)</label>
											<input
												onChange={e => {
													setEmployeeSalary(e.target.value)
												}}
												required
												type="number"
												className="w-full bg-gray-100 p-2 mt-2 mb-3"
											/>
										</div>
									</div>
									{/* Button to close the modal */}
									<div className="bg-gray-200 px-4 py-3 text-right">
										<button
											type="button"
											className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
											onClick={() => setVisible(false)}
										>
											<i className="fas fa-times"></i> Cancel
										</button>
										{/* Button to add the Employee to the marketplace */}
										<button
											type="submit"
											disabled={!!loading || !isComplete || !createEmployee}
											className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
										>
											{loading ? loading : 'Create'}
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	)
}

export default AddEmployeeModal
