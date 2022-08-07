import React from 'react';
import AddContact from '../contacts/AddContact'
import singletonRouter from "next/router";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));
describe("Add Contact Tests",() => {
  const jestTest = jest.fn()

  const unmockedFetch = global.fetch

    beforeAll(() => {
        jest.setTimeout(90 * 1000)
        global.fetch = () =>
        Promise.resolve({
        json: () => Promise.resolve([]),
        })
    })

    afterAll(() => {
        global.fetch = unmockedFetch
    })


  beforeEach(() => {
    jest.resetModules();
    mockRouter.setCurrentUrl("/intials");
  });

  it("Add contact page is rendering correctly", () => {
    const component = render(<AddContact />)
    expect(component).toMatchSnapshot()
  })


  it("onSubmit is Called", async() => {
    const jsdomAlert = window.alert;
    window.alert = () => {};  
    render(<AddContact />)
    userEvent.type(screen.getByTestId('name'),"new value")
    userEvent.type(screen.getByTestId('number'), "12345")
    userEvent.type(screen.getByTestId('email'),"new@mail.com")
    userEvent.click(screen.getByRole('button', {
      name: /save/i
    }))
    await waitFor(() => {
      expect(singletonRouter).toMatchObject({asPath: "/contacts"})
    })
    window.alert = jsdomAlert; 
  })

})
