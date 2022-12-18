import { NextPage } from 'next';

export interface IPageAuthRoles {
  isOnlyAdmin?: boolean;
  isOnlyUser?: boolean;
}

export type NextPageAuth<P = {}> = NextPage<P> & IPageAuthRoles;

export type TypeComponentAuthFields = { Component: IPageAuthRoles };
