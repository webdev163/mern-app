import React, { FC } from 'react';

interface LinkCardProps {
  link: {
    to: string,
    from: string,
    clicks: number,
    date: Date
  }
}

export const LinkCard: FC<LinkCardProps> = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Clicks: <strong>{link.clicks}</strong></p>
      <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>
  )
}