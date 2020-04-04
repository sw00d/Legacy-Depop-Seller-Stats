import React, { useState } from 'react'
import Switch from 'react-ios-switch'

import { singleRow, headerRow, tableContainer, a, container } from '../styles/table.module.scss'
import { switchContainer, label } from '../styles/salesByTime.module.scss'

const RecentSales = ({ state }) => {
  const [showRecent, toggleRecent] = useState(false)
  const keys = ['date_of_sale', 'buyer', 'item_price']
  const labels = {
    date_of_sale: 'Date Sold',
    buyer: 'Buyer',
    item_price: 'Price'
  }
  if (!state.files) return null
  if (!state.files[0]) return null

  const filesToReverse = [...state.files]
  return (
    <div className={container}>
      <div className={switchContainer}>
        <div className={label}>
          Show Past {showRecent ? 'Week' : '5'} Sales
        </div>
        <Switch
          checked={showRecent}
          onChange={() => toggleRecent(!showRecent)}
        />
      </div>
      <div className={tableContainer}>
        <div className={headerRow}>
          {Object.keys(state.files[0]).map((key) => {
            if (!keys.includes(key)) return null
            return <div key={key}>{labels[key]}</div>
          })}
        </div>
        <div>
          {
            filesToReverse.reverse().map((row, i) => {
              const start = new Date().setDate(new Date().getDate() - 5)
              const condition =
                showRecent
                  ? i < 5
                  : new Date(row.date_of_sale) > new Date(start)

              if (condition) {
                return (
                  <div className={singleRow} key={i}>
                    {keys.map((key, i) => {
                      if (i === 1) {
                        return (
                          <a
                            className={a}
                            key={i}
                            target='_blank'
                            rel='noopener noreferrer'
                            href={state.getUrl(row[key].toLowerCase())}
                          >
                            {row[key]}
                          </a>)
                      } else return <div key={i}>{row[key]}</div>
                    })}
                  </div>
                )
              } else return null
            })
          }
        </div>
      </div>

    </div>
  )
}

export default RecentSales
