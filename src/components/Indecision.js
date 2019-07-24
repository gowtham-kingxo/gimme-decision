import React from 'react';

import AddOption from './AddOption'; 
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
      options: [],
      selectedOption: undefined,
    }; 

    handleDeleteOptions = () => {
      this.setState(() => ({ options: []}));
    }
  
    handleDeleteOption = (optionToBeRemoved) => {
      console.log(optionToBeRemoved)
      this.setState((prevState) => ({
        options: prevState.options.filter((option) => option !== optionToBeRemoved)
      }));
    }
  
    handlePick = () => {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      this.setState(() => ({
        selectedOption: option
      }));
    }
  
    handleAddOption = (option) => {
      if (!option) {
        return 'Enter valid value to add item';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This option already exists';
      }
  
      this.setState((prevState) => ({ options: prevState.options.concat(option)}));
    }

    clearSelectedOption = () => {
      this.setState(() => ({ selectedOption: null}));
    }
  
    componentDidMount() {
      try {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
        if (options) {
          this.setState(() => ({ options }));
        }
      } catch (err) {
        // Do nothing. Just to catch and prevent the app from crashing incase of bad json in localStorage
      }
      
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
  
    render() {
      const title = 'Indecision';
      const subtitle = 'Put your life in the hands of a computer';
  
      return (
        <div>
          <Header title={title} subtitle={subtitle} />
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <Options
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleAddOption={this.handleAddOption}
            handleDeleteOption={this.handleDeleteOption}
          />
          <AddOption
            handleAddOption={this.handleAddOption}
          />
          <OptionModal 
            selectedOption={this.state.selectedOption}
            clearSelectedOption={this.clearSelectedOption}
          />
        </div>
      );
    }
  }