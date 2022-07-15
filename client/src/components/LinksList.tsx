import React, { FC } from 'react';
import { Link } from '../types/modals';
import { Link as NavLink } from 'react-router-dom';

interface LinksListProps {
  links: Link[]
}

export const LinksList: FC<LinksListProps> = ({ links }) => {
  if (!links.length) {
    return <p className="center">No links yet</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Original link</th>
        <th>Shortened link</th>
        <th>Open</th>
      </tr>
      </thead>

      <tbody>
      {links.map((el, idx) => {
        return (
          <tr key={el._id}>
            <td>{idx + 1}</td>
            <td>{el.from}</td>
            <td>{el.to}</td>
            <td>
              <NavLink to={`/detail/${el._id}`}>Open</NavLink>
            </td>
          </tr>
        )
      })}
      </tbody>
    </table>

  )
}