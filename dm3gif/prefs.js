//------------------------------------
// release dates
//------------------------------------

// The date string must be formatted as shown. These is used as date cuttoffs and is not displayed in the program.
var date_release = "June 30, 2017";
var date_day_before = "June 29, 2017";
var date_week_before = "June 23, 2017";


//------------------------------------
// localization strings
//------------------------------------

// Aside from 'txt' which defines the string to associate with the id, you can add any CSS param into the object to override the default. It is possible to change font face, color, size, positioning, etc. If no override params are included, the default style is used from style.css. Note that any HTML markup can be included in the txt paramiter.",

// [example]: "some_text": {"txt": "SOME TEXT", "color":"#FF0000", "fontSize": "30pt", "lineHeight":"50px", "marginTop": "30px"}

var oLANG = {

  "date_msg_theaters": {"txt": "ONLY IN CINEMAS"},
  "date_msg_1": {"txt": "JUNE 30"},
  "date_msg_2": {"txt": "THIS FRIDAY"},
  "date_msg_3": {"txt": "TOMORROW"},
  "date_msg_4": {"txt": "NOW PLAYING"},

  "loading": {"txt": "LOADING... "},

  "title_1": {"txt": "GIF"},
  "title_2": {"txt": "CREATOR"},  

  "select_video": {"txt": "SELECT A VIDEO"},
  "set_start": {"txt": "SET START TIME"},
  "set_length": {"txt": "SET GIF LENGTH"},

  "more_options":  {"txt": "MORE OPTIONS"},
  "less_options":  {"txt": "LESS OPTIONS"},
  "create":  {"txt": "CREATE"},
  "share":  {"txt": "SHARE"},
  "back":  {"txt": "BACK"},
  "new_gif":  {"txt": "NEW GIF"},

  "legal": {"txt": "LEGAL"},
  "legal_terms": {"txt": "TERMS OF SERVICE"},
  "legal_privacy": {"txt": "PRIVACY POLICY"},
  "legal_mpaa": {"txt": "MPAA"},
  "legal_parentalguide": {"txt": "PARENTAL GUIDE"},
  "legal_ratings": {"txt": "FILM RATINGS"},
  "legal_copyright": {"txt": "Motion Picture © 2017 Universal Studios. All Rights reserved."},
}


var video_list = [
  {thumb: "media/videos/thumb_1.png", link:"media/videos/Video_1_low_4.mp4"},
  {thumb: "media/videos/thumb_2.png", link:"media/videos/Video_1_low_4.mp4"}, 
];

var gif_lengths = [0.5, 1, 1.5, 2, 2.5, 3];
var gif_lengths_additional = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

var social_links = [
  {service:"facebook", icon: "media/images/icon_facebook.svg", link:""},
  {service:"twitter", icon: "media/images/icon_twitter.svg", link:""},
  {service:"pinterest", icon: "media/images/icon_pinterest.svg", link:""},
  {service:"link", icon: "media/images/icon_link.svg", link:""},
  {service:"download", icon: "media/images/icon_download.svg", link:""},
  {service:"email", icon: "media/images/icon_email.svg", link:""},


]


var legal_links = [

];


var legal_billing = "media/images/studioLogos.png";

var legal_images = [
  "media/diablo.png",
  "media/rating.png",
  "media/wwe.png",
  "media/bhtilt.png" 
];

