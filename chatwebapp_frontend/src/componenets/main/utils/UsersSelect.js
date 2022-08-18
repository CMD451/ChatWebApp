import { useEffect, useState } from "react";
import { searchForUsers } from "../../../lookup/lookup";
import { returnLoading } from "../../util/util";
import Select from 'react-select'
import Async, { useAsync } from 'react-select/async';
import AsyncSelect from 'react-select/async';

export function UsersSelect(props) {
    //todo 
    //reduce amount of requests
    const [users, setUsers] = useState([])
    const [selectedOptions, setSelectedOptions] = useState([])

    const [page, setPage] = useState(1);
    const [username, setUsername] = useState("")
    const [lastUsername, setLastUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    function loadUsers(username) {
        let request_page = 1;
        let isLoadingNextPage = false;
        if (lastUsername == username) {
            if (page == null) {
                return
            }
            isLoadingNextPage = true;
            request_page = page
        }
        setIsLoading(true)
        searchForUsers(username, request_page)
            .then((response => {
                setLastUsername(username)
                setPage(response.body.next)
                let new_users = response.body.results;
                if (isLoadingNextPage) {
                    new_users = users.concat(new_users)
                }
                setUsers(new_users)
                setIsLoading(false)
            }))
    }
    function usersToOptions(usersArray) {
        return usersArray.map((value) => {
            return { value: value.id, label: value.username }
        })
    }
    function optionsToUsers(optionsArray) {
        return optionsArray.map((value) => {
            return {id:value.value,username:value.label}
        })
    }
    async function loadOptions() {
        await loadUsers(username);
        let options = usersToOptions(users)
        return options
    }
    function handleInputChange(new_username) {
        setUsername(new_username)
    }
    function handleChange(e, action) {
        console.log(action.action)
        let new_options = []
        switch (action.action) {
            case 'select-option':
                new_options = selectedOptions.concat(action.option)
                break;
            case 'clear':
                new_options = []
                break;
            case 'remove-value':
                e = e.filter((value) => {
                    if (value.value == action.removedValue.value) {
                        return false
                    }
                    return true
                })
                new_options = e
                break;
            default:
                break
        }
        setSelectedOptions(new_options);
        if (props.onUsersChange) {
            props.onUsersChange(optionsToUsers(new_options))
        }
    }
    useEffect(() => {
        if (props.initial) {
            let initalOptions = usersToOptions(props.initial)
            console.log("useEffect")
            setSelectedOptions(initalOptions)
        }
    }, [props.initial]);
    return (
        <div className="parentDiv">
            UsersSelect
            <AsyncSelect
                isMulti
                value={selectedOptions}
                cacheOptions
                defaultOptions
                onChange={handleChange}
                loadOptions={loadOptions}
                onInputChange={(value) => handleInputChange(value.replace(/\W/g, ''))}
            />
        </div>
    );

}
export default UsersSelect;

