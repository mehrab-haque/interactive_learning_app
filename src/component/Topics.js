import React,{useEffect,useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {useSelector,useDispatch} from 'react-redux'
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch,Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Circle } from 'rc-progress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
import ShareIcon from '@material-ui/icons/Share';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {fetchTopics} from '../action/content'
import uuid from 'react-uuid'


//dummy data experiment
import Problem from './Problem'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  stepperRoot: {
    width: '100%',
  },
  canvasPaper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2,1),
  },
  root1:{
    height:'100%'
  },
  eliminationGrid : {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));



const Topics=props=>{

  const topics=useSelector(state=>state.topics)
  const dispatch=useDispatch()

  const classes = useStyles();
  useEffect(() => {
    getTopics()
  },[]);

  const getTopics=()=>{
    if(topics==null)
      fetchTopics(dispatch)
  }

  return(
    <Grid item xs={12} md={9}>
      {
        topics==null?(
          <LinearProgress />
        ):(
          <div>
            <Breadcrumbs style={{marginLeft:'16px',marginBottom:'12px'}} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" to="/" >
                <font style={{color:'#888888'}}>
                Topics
                </font>
              </Link>
            </Breadcrumbs>
            <Grid direction='row' alignItems="stretch" container spacing={1} className={classes.grid}>
              {
                topics.map((topic,ind)=>{
                  return(
                    <Grid key={uuid()} style={{minHeight:'100%'}} item xs={6} md={4}>
                      <Link color="inherit" to={'/topic/'+topic.topic_id+'/'} onClick={(e) => {e.stopPropagation();}}>
                        <Card className={classes.root1}>
                          <CardActionArea>
                            <CardMedia
                              className={classes.media}
                              image={topic.logo}
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {topic.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                {topic.nseries} Serieses<br/>
                                {topic.nproblem} Problems<br/>
                              </Typography>
                            </CardContent>

                          </CardActionArea>
                        </Card>
                      </Link>
                    </Grid>
                  )
                })
              }
              </Grid>
            </div>
        )
      }


    </Grid>
  )

  //Loading dummy problem
  var arr=[
  {
    "author_id": "0RMFi9mrPNe7mol2JwcZAf40F3n2",
    "description": "Abid, Rahul, Rana and Iti are 4 friends. One day they got 1 mango, 1 guava, 1 orange and 1 litchi i.e. 4 fruits in total, each one will get one fruit, you have to divide these 4 fruits and give one fruit to each one.\n\nTo help you share the fruits, 4 friends told the truth about their likes and dislikes, you have to share the fruit in such a way that everyone gets the fruit they like.\n\nAbid: I like all the fruits.\n\nRahul: I don't like mangoes at all.\n\nRana: I will eat either guava or orange.\n\nIti: I only want the orange!!!",
    "category": "exclusion",
    "difficulty": "medium",
    "language": "en",
    "title": "Divide The Fruits",
    "interactiveType": "exclusion grid",
    "timestamp": 1604315422922,
    "logo": "https://buet-edu-lang-eng.netlify.app/static/media/mango.43e3beeb.png",
    "grade": 5,
    "ansType": "interactive",
    "series_id": 1,
    "data": {
      "problem": {
        "version": 1,
        "type": "interactive",
        "statement": "If you press any fruit next to any friend below, it will be black and white or colored, black and white means that friend will not get the fruit, and being colored means he/she will get it.\n\nSet the fruits in such a way that each friend gets exactly one fruit. Then click on the Submit button below",
        "explanation": "Abid will get the mango, Rahul will get the lichie, Rana will get the guava and Iti will get the orange.",
        "data": {
          "type": "exclusion_grid",
          "rowHeading": [
            "Abid",
            "Rahul",
            "Rana",
            "",
            "",
            "kjhkjhk",
            "sadasd",
            "asd"
          ],
          "columnHeading": [
            "Mango",
            "Guava",
            "Orange",
            "   ",
            "kjghjk",
            "jhgjh",
            "asdads"
          ],
          "cell": [
            [
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "  ",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png"
            ],
            [
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "   ",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png"
            ],
            [
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "   ",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png"
            ],
            [
              "   ",
              "    ",
              "   ",
              "  ",
              "  ",
              "    ",
              "  "
            ],
            [
              "",
              "",
              "",
              "",
              "",
              "",
              ""
            ],
            [
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "",
              "",
              "",
              ""
            ],
            [
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "",
              "",
              "",
              ""
            ],
            [
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
              "",
              "",
              "",
              ""
            ]
          ],
          "initialState": [
            [
              true,
              true,
              true,
              true,
              true,
              true,
              true
            ],
            [
              true,
              true,
              true,
              true,
              true,
              true,
              true
            ],
            [
              true,
              true,
              true,
              true,
              true,
              true,
              true
            ],
            [
              true,
              true,
              true,
              true,
              true,
              true,
              true
            ],
            [
              true,
              true,
              true,
              true,
              true,
              true,
              true
            ],
            [
              true,
              true,
              true,
              true,
              true,
              true,
              true
            ],
            [
              true,
              true,
              true,
              true,
              true,
              true,
              true
            ],
            [
              true,
              true,
              true,
              true,
              true,
              true,
              true
            ]
          ],
          "data": {
            "answer": [
              [
                false,
                true,
                true,
                true,
                true,
                true,
                true
              ],
              [
                false,
                true,
                true,
                true,
                false,
                false,
                true
              ],
              [
                true,
                true,
                true,
                true,
                true,
                true,
                true
              ],
              [
                true,
                true,
                true,
                true,
                true,
                true,
                true
              ],
              [
                true,
                true,
                true,
                true,
                true,
                true,
                true
              ],
              [
                false,
                false,
                true,
                true,
                true,
                true,
                true
              ],
              [
                false,
                true,
                true,
                true,
                true,
                true,
                true
              ],
              [
                true,
                true,
                true,
                true,
                true,
                true,
                true
              ]
            ]
          }
        }
      }
    }
  },
  {
    "author_id": "8Xq06Cpjf6bingRbcoqRnNyTPdg1",
    "description": "In real life, many of our problems can be easily solved if we can somehow eliminate the wrong choices. The best approach is to assume one option to be true and then find if that leads to a contradiction. If so, we can eliminate the option and try again with the rest of the options until we are left with just one choice.",
    "category": "logical problems",
    "difficulty": "medium",
    "language": "en",
    "title": "Pilgrim’s Dilemma",
    "interactiveType": "none",
    "timestamp": 1604210793487,
    "logo": "https://buet-edu-1.s3.ap-south-1.amazonaws.com/Anup/Wise+Pilgrim+Series/Ques_1/1.png",
    "grade": 3,
    "ansType": "mcq",
    "series_id": 2,
    "data": {
      "problem": {
        "version": 1,
        "type": "none",
        "statement": "One day, an old but wise pilgrim reached a village on the way to an ancient temple. The village road split into two separate paths. He remembers one of them leads to a deep jungle and the other to the temple. As he grew old, his memories were fuzzy. He forgot which way led to the temple.\n\n![](https://buet-edu-1.s3.ap-south-1.amazonaws.com/Anup/Wise+Pilgrim+Series/Ques_1/1.png)\n\nHe needed information from the villagers. He knew that there was one person who always lies and the others always speak the truth. One of the villagers answered:\n\n> **\"If you ask anyone in the village they will say that the left path leads to the temple.\"\n**\n\nThe pilgrim smiled and decided which way to go without needing to ask anyone else.  \n\n**Can you guess which path leads to the temple?**\n",
        "explanation": "Let us first assume that the person isn’t the liar. Therefore, his statement must be true. But we know that someone must lie, so, if everyone but the liar tells the truth, they all cannot agree on the same answer. For example, if the left path actually leads to the temple, then the liar would show the right path and the rest of the villagers would show the left path. Hence, the person cannot be telling the truth. So, the pilgrim should take the right path to reach the temple.",
        "data": {
          "type": "mcq",
          "data": {
            "options": [
              "Left",
              "Right"
            ],
            "answer": "Right"
          }
        }
      }
    }
  },
  {
    "author_id": "VoTf81DreZTqGwSXurQ7g8DBnV43",
    "description": "_Area of a rectangle= base_ ×  _height_\n![](https://buet-edu-1.s3.ap-south-1.amazonaws.com/Zarzees/triangle5.png)",
    "category": "geometry",
    "difficulty": "medium",
    "language": "en",
    "title": "Finding Area of a Distorted Rectangle",
    "interactiveType": "none",
    "timestamp": 1604516224071,
    "logo": "https://buet-edu-1.s3.ap-south-1.amazonaws.com/Zarzees/Rectangle1.png",
    "grade": 4,
    "ansType": "text",
    "series_id": 3,
    "data": {
      "problem": {
        "version": 1,
        "type": "none",
        "statement": "**What is the area of the given figure?**\n![](https://buet-edu-1.s3.ap-south-1.amazonaws.com/Zarzees/triangle4.png)",
        "explanation": "Upper empty space is a 2 × 2 square so  \n Area of the figure=area of the 6×4 rectangle-area of the 2×2 square  \n**6×4-2×2=20**",
        "data": {
          "type": "text",
          "data": {
            "answer": [
              "20"
            ]
          }
        }
      }
    }
  },
  {
    "author_id": "VoTf81DreZTqGwSXurQ7g8DBnV43",
    "description": "_**Area of a triangle is =1/2 **_ × _**base**_ × _**height **_\n\n![](https://buet-edu-1.s3.ap-south-1.amazonaws.com/Zarzees/triangle2.png)",
    "category": "geometry",
    "difficulty": "medium",
    "language": "en",
    "title": "Intuition Might Lead You Wrong!",
    "interactiveType": "none",
    "timestamp": 1604516388076,
    "logo": "https://buet-edu-1.s3.ap-south-1.amazonaws.com/Zarzees/triangle3.png",
    "grade": 3,
    "ansType": "mcq",
    "series_id": 3,
    "data": {
      "problem": {
        "version": 1,
        "type": "none",
        "statement": "**Which triangle has the largest area?**\n\n\n\n![](https://buet-edu-1.s3.ap-south-1.amazonaws.com/Zarzees/triangle.png)",
        "explanation": "They all have same base and height.  \nSo all have the same area.",
        "data": {
          "type": "mcq",
          "data": {
            "options": [
              "The one with pink sides",
              "The one with red sides",
              "The one with blue sides",
              "All have the same area"
            ],
            "answer": "All have the same area"
          }
        }
      }
    }
  },


{
  "author_id": "bWqV1RhStaNRdpJF2nhPlcqUwIt2",
  "description": "Abid, Rahul, Rana and Iti are 4 friends. One day they got 1 mango, 1 guava, 1 orange and 1 litchi i.e. 4 fruits in total, each one will get one fruit, you have to divide these 4 fruits and give one fruit to each one.\n\nTo help you share the fruits, 4 friends told the truth about their likes and dislikes, you have to share the fruit in such a way that everyone gets the fruit they like.\n\nAbid: I like all the fruits.\n\nRahul: I don't like mangoes at all.\n\nRana: I will eat either guava or orange.\n\nIti: I only want the orange!!!",
  "doc_id": "4iWDs3oulu7Mhx27BR20",
  "category": "exclusion",
  "difficulty": "medium",
  "language": "en",
  "title": "Divide the Fruits(Mcq version)",
  "interactiveType": "exclusion_grid",
  "timestamp": 1605085533054,
  "logo": "https://buet-edu-lang-eng.netlify.app/static/media/mango.43e3beeb.png",
  "grade": 5,
  "ansType": "mcq",
  "series_id": 1,
  "data": {
    "problem": {
      "version": 1,
      "type": "mcq",
      "statement": "Who will get lichie?",
      "explanation": "Abid will get the mango, Rahul will get the lichie, Rana will get the guava and Iti will get the orange.",
      "data": {
        "type": "exclusion_grid",
        "rowHeading": [
          "Abid",
          "Rahul",
          "Rana",
          "",
          "",
          "kjhkjhk",
          "sadasd",
          "asd"
        ],
        "columnHeading": [
          "Mango",
          "Guava",
          "Orange",
          "",
          "kjghjk",
          "jhgjh",
          "asdads"
        ],
        "cell": [
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png"
          ],
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png"
          ],
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png"
          ],
          [
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "",
            "",
            ""
          ],
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "",
            "",
            ""
          ],
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "",
            "",
            ""
          ]
        ],
        "initialState": [
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ]
        ],
        "data": {
          "options": [
            "Abid",
            "Rahul",
            "Rana",
            "Iti"
          ],
          "answer": "Rahul"
        }
      }
    }
  }
},
{
  "author_id": "bWqV1RhStaNRdpJF2nhPlcqUwIt2",
  "description": "Abid, Rahul, Rana and Iti are 4 friends. One day they got 1 mango, 1 guava, 1 orange and 1 litchi i.e. 4 fruits in total, each one will get one fruit, you have to divide these 4 fruits and give one fruit to each one.\n\nTo help you share the fruits, 4 friends told the truth about their likes and dislikes, you have to share the fruit in such a way that everyone gets the fruit they like.\n\nAbid: I like all the fruits.\n\nRahul: I don't like mangoes at all.\n\nRana: I will eat either guava or orange.\n\nIti: I only want the orange!!!",
  "doc_id": "fX1LT0wBHMZw5Z8wNELZ",
  "category": "exclusion",
  "difficulty": "medium",
  "language": "en",
  "title": "Divide The Fruits(Text version)",
  "interactiveType": "exclusion_grid",
  "timestamp": 1605086838983,
  "logo": "https://buet-edu-lang-eng.netlify.app/static/media/mango.43e3beeb.png",
  "grade": 5,
  "ansType": "text",
  "series_id": 1,
  "data": {
    "problem": {
      "version": 1,
      "type": "text",
      "statement": "What will Rahul get?",
      "explanation": "Abid will get the mango, Rahul will get the lichie, Rana will get the guava and Iti will get the orange.",
      "data": {
        "type": "exclusion_grid",
        "rowHeading": [
          "Abid",
          "Rahul",
          "Rana",
          "",
          "",
          "kjhkjhk",
          "sadasd",
          "asd"
        ],
        "columnHeading": [
          "Mango",
          "Guava",
          "Orange",
          "",
          "kjghjk",
          "jhgjh",
          "asdads"
        ],
        "cell": [
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png"
          ],
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png"
          ],
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png"
          ],
          [
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          ],
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "",
            "",
            ""
          ],
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "",
            "",
            ""
          ],
          [
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "https://buet-edu-lang-eng.netlify.app/static/media/tick.d20e7e81.png",
            "",
            "",
            "",
            ""
          ]
        ],
        "initialState": [
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ],
          [
            true,
            true,
            true,
            true,
            true,
            true,
            true
          ]
        ],
        "data": {
          "answer": [
            "lichie"
          ]
        }
      }
    }
  }
}
]

////console.log(arr)

  return(
    <Problem data={arr[1]}/>
  )
}


export default Topics
