import { EOL } from 'os'
import fs from 'fs'
import path from 'path'

export function exportResult(
  name: string,
  data: Array<{
    date: string;
    morning: string;
    evening: string;
  }>) {
  // output file in the same folder
  const filename = path.join(__dirname, `../../output/${name.replace('/', '-')}.csv`)
  const output: string[] = [
    'date,morning-direction,morning-speed,evening-direction,evening-speed',
  ]

  data.forEach(d => {
    const row = [] // a new array for each row of data
    row.push(d.date)
    row.push(d.morning)
    row.push(d.evening)

    output.push(row.join()) // by default, join() uses ','
  })

  console.log({ output })

  fs.writeFileSync(filename, output.join(EOL))
}
