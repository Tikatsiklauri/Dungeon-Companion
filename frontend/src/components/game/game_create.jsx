import React from 'react';
import CharacterShow from './game_character_show';
import MonsterShow from './game_monster_show';

class GameCreate extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            characters: {},
            monsters: [],
            searchMonstWord: '',
            searchCharWord: '',
            monsterInfo: null,
            characterInfo: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getMonsters = this.getMonsters.bind(this);
        this.addMonster = this.addMonster.bind(this);
        this.addCharacter = this.addCharacter.bind(this);
        this.showMonster = this.showMonster.bind(this);
        this.showCharacter = this.showCharacter.bind(this);
        this.getCharacters = this.getCharacters.bind(this);
        this.removeCharacter = this.removeCharacter.bind(this);
        this.removeMonster = this.removeMonster.bind(this);
        this.timer = null;
    }
    
    componentDidMount(){
        this.props.getCharacters();
    }

    handleSubmit(e){
        e.preventDefault();
        const newGame = {
            title: this.state.title,
            players: Object.values(this.state.characters),
            monsters: this.state.monsters,
        }
        this.props.createGame(newGame)
        .then((data) => this.props.history.push(`/games/${data.game._id}`) )
    }

    handleInput(type){
        return (e) => {
            this.setState({ [type]: e.target.value });
        };
    }

    getMonsters(e){
        this.setState({searchMonstWord: e.target.value});
        clearTimeout(this.timer);
        const search = this.props.searchMonsters;
        const name = e.target.value;
        this.timer = setTimeout( () => {if(name !== '') search(name)}, 600);
    }

    showMonster(monster){
        return (e) => {
            this.props.fetchMonster(monster.index)
            .then((newMonst) => this.setState({monsterInfo: newMonst.monster }))
        }
    }

    addMonster(monster){
        return (e) =>{
            this.props.fetchMonster(monster.index)
            .then((newMonst) =>{ 
                const newMonsters = [...this.state.monsters]
                newMonsters.push({
                index: monster.index,
                initiative: Math.floor((Math.random()*20) + 1) + Math.floor((newMonst.monster.dexterity - 10)/2),
                hp: newMonst.monster.hit_points,
                name: monster.name,
                });
                this.setState({monsters: newMonsters})
            });
        }
    }

    removeMonster(idx){
        return (e) =>{
            const newMonsters = this.state.monsters.slice(0, idx).concat(this.state.monsters.slice(idx + 1, this.state.monsters.length));
            this.setState({monsters: newMonsters});
        }
    }

    showCharacter(character){
        return (e) => {
            this.setState({characterInfo: character });
        }
    }

    getCharacters(){
        // this.setState({searchCharWord: e.target.value});
        // clearTimeout(this.timer);
        // const name = e.target.value;
        // this.timer = setTimeout( () => {if(name !== '') search(name)}, 600);
    }

    addCharacter(character){
        return (e) =>{
            if(this.state.characters){
                const characters = Object.assign({},this.state.characters );
                characters[character._id] = {
                    name: character.name,
                    initiative: Math.floor((Math.random()*20) + 1) + Math.floor((character.dex - 10)/2),
                    hp: character.hitPoints,
                    id: character._id,
                };
                this.setState({characters: characters});
                }
        }
    }
    removeCharacter(id){
        return (e) =>{
            const newCharacters = Object.assign({}, this.state.characters);
            delete newCharacters[id];
            this.setState({characters: newCharacters});
        }
    }

    render(){
        const monsterInfo = this.state.monsterInfo ? < MonsterShow monster={this.state.monsterInfo} /> : <div className='monsters-show' ><h2>No Monster Details</h2></div>;
        const characterInfo = this.state.characterInfo ?  <CharacterShow character={this.state.characterInfo} /> : <div className='characters-show'><h2>No Character Details</h2></div>; 

        return (<div className='game-create-main'>
            <div>
            <h1>Create a Game Session</h1>
            
            </div>
            <form action="" onSubmit={this.handleSubmit} >
                <label htmlFor="">Title: 
                    <input type="text" value={this.state.title} onChange={this.handleInput('title')}  />

                </label>
                
                <button className='create-game'>Make Game</button>
            </form>
            <div className='game-characters-main'>
                <div className='characters-chosen'>
                    <h2>Characters Chosen</h2>
                        <ul>
                            {Object.values(this.state.characters).map(player => (<li>
                                <h3>{player.name}</h3>
                                 <button onClick={this.removeCharacter(player.id)}>Remove </button>
                            </li> ))}
                        </ul>
                </div>
                <div className='characters-available'>
                <h2>Characters Available</h2>
                <ul>
                    {this.props.characters.map(character => (<li> 
                        <h3>{character.name}</h3>
                        <button onClick={this.showCharacter(character)}>More Info</button>
                        <button onClick={this.addCharacter(character)}>Add Player</button>
                    </li>))}
                </ul>
                </div>
                <div className="characters-show">
                    {characterInfo}
                </div>

            </div>

            <div className='game-monsters-main'>
                <div className='monsters-chosen'>
                    <h2>Monsters Chosen</h2>
                <ul>
                    {this.state.monsters.map((monster,idx) => (<li>
                        <h3>{monster.name}</h3>
                         <button onClick={this.removeMonster(idx)}>Remove</button>
                    </li> ))}
                </ul>
                </div>
                <div className ='monsters-search'>
                    <h2>Monster list</h2>
                <label htmlFor=""> Find Monster
                    <input type="text" value={this.state.searchMonstWord} onChange={this.getMonsters} />
                    </label>
                <ul>

                    {this.props.monsters.map(monster => (<li> 
                        <h3>{monster.name}</h3> 
                        <button onClick={this.showMonster(monster)}>More Info</button>
                        <button onClick={this.addMonster(monster)}>Add Monster</button>
                    </li>))}
                </ul>
            </div>
                <div className='monsters-show'>
                 {monsterInfo}
                </div>

            </div>
            
            
        </div>)
    }
}

export default GameCreate;
