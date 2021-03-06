import axios from 'axios';

export const getMonsters = () => {
    return axios.get('http://www.dnd5eapi.co/api/monsters')
}

export const getMonster = monster => {
    return axios.get(`http://www.dnd5eapi.co/api/monsters/${monster}`)
}

export const searchMonster = monster => {
    return axios.get(`http://www.dnd5eapi.co/api/monsters?name=${monster}`)
}
