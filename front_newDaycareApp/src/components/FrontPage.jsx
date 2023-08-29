/* eslint-disable react/react-in-jsx-scope */
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/de'


const FrontPage = () => {

	const [calendarValue, setCalendarValue] = useState(dayjs('2023-04-04'))
	
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
				<div>
					Moi
				</div>
			</div>

            
		</>

	)
}

export default FrontPage