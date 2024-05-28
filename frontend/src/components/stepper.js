import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card, Paper } from '@mui/material';
import Snowflakes from './sback';


const steps = ['INTRODUCTION', 'RULES', 'AI,Chainlink','PLAY!!'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div style={{overflow:'hidden'}}>
    <Snowflakes />
<div style={{margin:'60px',marginLeft:'190px' ,overflow:'hidden'}}>
<Box
      style={{ position: 'relative', zIndex: 1,borderRadius: '20px' }}
      sx={{
        width: '82%',
        height: '88%',
        padding: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(3px)', // Add blur effect
        WebkitBackdropFilter: 'blur(1px)', // For Safari support
      }}
    >
<Card>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      </Card>

      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
           {activeStep===0?( <Card  style={{margin:'10px'}}>
            Three-Handed Whist, also known as Widow Whist, is a captivating variant of the traditional Whist card game, tailored for three players. Originating from the classic game of Whist that gained immense popularity in the 18th and 19th centuries, Three-Handed Whist retains the core mechanics of its predecessor while introducing unique elements to accommodate an odd number of participants.
            <br></br>
            <br></br>
            <br></br>
<Card style={{margin:'10px'}}>Objective:
</Card>
The primary goal in Three-Handed Whist is to win the most tricks in each round. A trick is a set of cards played by each player, and the player who plays the highest card of the leading suit or a trump card wins the trick. Strategic play and careful observation of opponents' moves are essential to succeeding in this game.

            </Card>): activeStep===1?(<Card  style={{margin:'10px'}}>Three-Handed Whist
Objective: The goal is to win as many tricks as possible.

Setup:

Use a standard 52-card deck.
Remove the 2 of clubs to leave 51 cards.
Deal 17 cards to each player.
Gameplay:

Determine the dealer for the first round (e.g., draw cards, lowest card deals).
The player to the left of the dealer leads the first trick by playing any card.
Players must follow suit if possible. If they can't, they can play any card.
The highest card of the suit led wins the trick. The winner of each trick leads the next one.
Scoring:

Each player gets 1 point for each trick they win.
After all 17 tricks have been played, record the scores.
The player with the most points after a predetermined number of rounds (e.g., 5 rounds) wins the game.</Card>):
activeStep===2?(<div>
    <Card  style={{margin:'10px'}}>AI And Chainlink</Card>
</div>):(<div>
    <Card  style={{margin:'10px'}}>CLICK BELOW TO PLAY</Card>
</div>)}

            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                <Paper>
              Step {activeStep + 1}
              </Paper>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
              variant="contained"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    <Paper>
                    Step {activeStep + 1} already completed
                    </Paper>
                  </Typography>
                ) : (
                  <Button variant="contained" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
    </div>
    </div>
  );
}
