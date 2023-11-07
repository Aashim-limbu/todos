function RadioButtons({ label, notificationMethods, handleChange, checked }) {
	return (
		<div>
			<label className="text-base font-semibold text-gray-900">{label}</label>
			<fieldset className="mt-4">
				<legend className="sr-only">Notification method</legend>
				<div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
					{notificationMethods.map(({ id, title }) => (
						<div key={id} className="flex items-center">
							<input
								id={id}
								name="notification-method"
								type="radio"
								checked={id == checked}
								className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
								onChange={() => {
									handleChange(id);
								}}
							/>
							<label
								htmlFor={id}
								className="ml-3 block text-xl font-medium leading-6 text-gray-900"
							>
								{title}
							</label>
						</div>
					))}
				</div>
			</fieldset>
		</div>
	);
}

export default RadioButtons;
