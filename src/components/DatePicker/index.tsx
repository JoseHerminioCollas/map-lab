import React, { useState } from 'react'
import { DefaultButton } from '@fluentui/react/lib/Button'
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout'
import { Calendar, DayOfWeek } from '@fluentui/react/lib/Calendar'
import { FocusTrapZone } from '@fluentui/react/lib/FocusTrapZone'

const DayPickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  prevYearAriaLabel: 'Previous year',
  nextYearAriaLabel: 'Next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close',
  monthPickerHeaderAriaLabel: '{0}, select to change the year',
  yearPickerHeaderAriaLabel: '{0}, select to change the month',
}

export interface ICalendarButtonExampleProps {
  onDateSelect: (date: string) => void;
  isDayPickerVisible?: boolean;
  isMonthPickerVisible?: boolean;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  buttonString?: string;
  showMonthPickerAsOverlay?: boolean;
  showGoToToday?: boolean;
}

let calendarButtonElement: HTMLElement

export const CalendarButtonExample: React.FunctionComponent<ICalendarButtonExampleProps> = (
  props: ICalendarButtonExampleProps,
) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const {
    onDateSelect,
    showMonthPickerAsOverlay = false,
    isDayPickerVisible = true,
    isMonthPickerVisible = true,
    showGoToToday = true,
    buttonString = 'Click for Calendar',
    highlightCurrentMonth,
    highlightSelectedMonth,
  } = props
  const onUserDateSelect = (date: Date): void => {
    setShowCalendar(false)
    setSelectedDate(date)
    onDateSelect(date.toISOString().slice(0, 10))
  }

  return (
    <div>
      <div ref={calendarBtn => {
        if (calendarBtn) calendarButtonElement = calendarBtn
      }}
      >
        <DefaultButton
          onClick={() => setShowCalendar(true)}
          text={!selectedDate ? buttonString : selectedDate.toLocaleDateString()}
        />
      </div>
      {showCalendar && (
        <Callout
          isBeakVisible={false}
          className="ms-DatePicker-callout"
          gapSpace={0}
          doNotLayer={false}
          target={calendarButtonElement}
          directionalHint={DirectionalHint.bottomLeftEdge}
          onDismiss={() => setShowCalendar(false)}
          setInitialFocus
        >
          <FocusTrapZone firstFocusableSelector="ms-DatePicker-day--today" isClickableOutsideFocusTrap>
            <Calendar
              onSelectDate={onUserDateSelect}
              onDismiss={() => setShowCalendar(false)}
              isMonthPickerVisible={isMonthPickerVisible}
              value={selectedDate!}
              firstDayOfWeek={DayOfWeek.Sunday}
              strings={DayPickerStrings}
              isDayPickerVisible={isDayPickerVisible}
              highlightCurrentMonth={highlightCurrentMonth}
              highlightSelectedMonth={highlightSelectedMonth}
              showMonthPickerAsOverlay={showMonthPickerAsOverlay}
              showGoToToday={showGoToToday}
              maxDate={new Date()}
              minDate={new Date(2003, 0, 1)}
            />
          </FocusTrapZone>
        </Callout>
      )}
    </div>
  )
}
