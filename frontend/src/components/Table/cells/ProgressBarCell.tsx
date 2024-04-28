export const ProgressBarCell = ({value}: { value: number }) => {
  const getColor = (value: number) => {
    if (value < 35) return 'bg-red-600'
    if (value < 65) return 'bg-yellow-600'
    return 'bg-green-600'
  }

  const percent = Math.round(+value.toFixed(2) * 100)
  const percentString = `${percent}%`

  return (
    <div className="rounded-full bg-gray-700 w-36">
      <div
        className={`${getColor(percent)} text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full`}
        style={{width: percentString}}
      >
        {percentString}
      </div>
    </div>
  )
}