/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'

const Calendar = () => {

	const [calendarValue, setCalendarValue] = useState('2023-04-04')
	
	useEffect(() => {
		console.log(calendarValue.$d)
	}, [calendarValue])

	return (
		<>
			<div>
				<div>
					<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
						<DateCalendar value={calendarValue} onChange={(newValue) => setCalendarValue(newValue)}/>
					</LocalizationProvider>
				</div>
				
			</div>

            
		</>

	)
}

export default Calendar