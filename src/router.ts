import { createBrowserHistory, ReactLocation } from '@tanstack/react-location'

// Create a browser history
const browserHistory = createBrowserHistory()

// Set up a ReactLocation instance with the memory history
export const location = new ReactLocation({
    history: browserHistory
})
