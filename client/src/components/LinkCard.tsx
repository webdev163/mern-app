import React, { FC } from 'react';
import { Link } from '../types/modals';

interface LinkCardProps {
  link: Link
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