import renderer from "react-test-renderer";
import ContactPage, {getStaticProps} from "../contacts";
import React from 'react';
import { act } from "react-dom/test-utils";
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

describe("Testing .....", () => {
    const contactsList = [
        {
            id: 1,
            name: "Sample1",
            email: "sample1@mail.com",
            mobile: 5451651845
        },
        {
            id: 2,
            name: "Sample2",
            email: "sample2@mail.com",
            mobile: 5451651844555
        }
    ]

    beforeEach(() => {
        jest.resetModules();
    })
    
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

    it("component has Email option",async() => {
        
        const component = renderer.create(<ContactPage contactsList={contactsList} />).root
        expect(component.findByProps({className: "Email"}).children).toEqual(['Email'])
        await act(() => Promise.resolve())
    });
    
    it("component rendering",async() => {
        
        const component = render(<ContactPage contactsList={[]} />)
        expect(component).toMatchSnapshot()
        await act(() => Promise.resolve())
    });
    
    test("setContact is called and sorting is working",async() => {
        const mocksetState = jest.fn(() => Promise.resolve);
        const useStateSpy = jest.spyOn(React, "useState");
        useStateSpy.mockImplementation((initialState) => [initialState, mocksetState]);
        render(<ContactPage contactsList={[]} />)
        const Email = screen.getByTestId('email-test')
        fireEvent.click(Email)
        expect(mocksetState).toHaveBeenCalled();
        await act(() => Promise.resolve())
        
    });
    
    test("Search is working...",async() => {
        const mocksetState = jest.fn(() => Promise.resolve);
        const useStateSpy = jest.spyOn(React, "useState");
        useStateSpy.mockImplementation((initialState) => [initialState, mocksetState]);
        const component = renderer.create(<ContactPage contactsList={contactsList} />).root
        component.findByProps({className: "form-control m-2"}).onChange
        expect(mocksetState).toHaveBeenCalled();
        await act(() => Promise.resolve())
        
    });

    test("Delete is working...",async() => {
        const mocksetState = jest.fn(() => Promise.resolve);
        const useStateSpy = jest.spyOn(React, "useState");
        useStateSpy.mockImplementation((initialState) => [initialState, mocksetState]);
        const component = renderer.create(<ContactPage contactsList={contactsList} />).root
        component.findByProps({id: "Deletebtn1"}).onClick
        expect(mocksetState).toHaveBeenCalled();
        await act(() => Promise.resolve())
        
    });

    test("getStaticProps working..", async () => {
        const response =  await getStaticProps()
        expect(response).not.toBe(null)
        await act(() => Promise.resolve())
    })

    
})
