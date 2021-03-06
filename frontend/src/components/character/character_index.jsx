import React from 'react';
import {Link} from 'react-router-dom'
import CharacterShowContainer from './character_show_container';

class CharacterIndex extends React.Component{
    constructor(props){
        super(props);
        this.showChar = this.showChar.bind(this);
    }

    componentDidMount(){
        this.props.getCharacters();
    }

    showChar(id){
        return (e) => {
            this.props.openModal()
            this.props.history.push(`/characters/${id}`)
        }
    }


    render(){
        const charShow =  this.props.character ? <CharacterShowContainer /> : <div className='character-show-main'><h1>Click char to get one</h1></div>;
        return (
            <div className='char-index-container'>
                <div className='char-index-main'>
                    <div className="char-index-title">
                        <Link to='/profile'>Back to profile</Link>
                        <h1>Manage Characters</h1>
                        <Link to='/characters/create'>Create Character</Link>
                    </div>

                    <div className="index-subcontainer">
                        <div className="char-thumbnail-container">
                            <ul >
                            {this.props.characters.reverse().map(char => (
                                <div className="char-thumbnail">
                                    <li key={char._id} onClick={this.showChar(char._id)}>
                                        <h2>Name: {char.name}</h2>
                                        <h3>Race: {char.race}</h3>
                                        <h3>Class: {char.klass}</h3>
                                        <h3>Level: {char.lvl}</h3>
                                        {/* <button onClick={this.showChar(char._id)}>More Info</button> */}
                                    </li>
                                </div>
                            ))}
                            </ul>
                        </div>

                        {charShow}
                    </div>
                </div>
            </div>
        )
    }
}
export default CharacterIndex;