let expand_button = document.querySelector(".expand_button");
let sidebar = document.querySelector(".sidebar");
let main_content_area = document.querySelector(".second-section");
let expand_library_icon = document.querySelector(".expand_button i");
let song_range = document.querySelector("#song_range");
let volume_range = document.querySelector("#volume_control");
let audio_player = document.querySelector(".player figure audio");

let curr_song_img = document.querySelector(".curr_song #image");
let curr_song_name = document.querySelector(".curr_song #song_name");
let curr_song_singers = document.querySelector(".curr_song #singers");

let more_player_controls = document.querySelector(
  ".player_helper_controls .more"
);

expand_button.addEventListener("click", () => {
  sidebar.classList.toggle("expand_sidebar");
  main_content_area.classList.toggle("shrink_main_content");
  if (main_content_area.classList.contains("shrink_main_content")) {
    // hide the extra helper controls
    document
      .querySelector(".player_helper_controls .extra_helper_controls")
      .classList.add("display-none");
    document
      .querySelector(".player_helper_controls .more")
      .classList.remove("display-none");
  } else {
    document
      .querySelector(".player_helper_controls .extra_helper_controls")
      .classList.remove("display-none");
    more_player_controls.classList.add("display-none");
  }
  expand_library_icon.classList.toggle("fa-arrow-right");
  expand_library_icon.classList.toggle("fa-arrow-left");
});

document.addEventListener("keydown", (event) => {
  console.log(event);
  if (event.code == "Space") {
    play_song.click();
  } else if (event.code == "ArrowRight") {
    audio_player.currentTime += 5;
  } else if (event.code == "ArrowLeft") {
    audio_player.currentTime -= 5;
  } else if (event.code == "ArrowUp") {
    if (audio_player.volume <= 0.95) {
      audio_player.volume += 0.05;
      volume_range.value = (parseFloat(volume_range.value) + 0.05).toFixed(2);
    }
  } else if (event.code == "ArrowDown") {
    if (audio_player.volume >= 0.05) {
      audio_player.volume -= 0.05;
      volume_range.value = (parseFloat(volume_range.value) - 0.05).toFixed(2);
    }
  }
});
let library_search = document.querySelector("#search_library");

document.addEventListener("click", (event) => {
  if (event.target == library_search) {
  } else {
    console.log("outside");
  }
});

// add the honey singh library in the library

let artists_list = document.querySelector(".artists_list");
let artist_name = "Honey Singh";
let artist_type = "Rapper";
let artist_image_source =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_j8TjXxehsVIB8K2sXrwMxAFRiUp6PacKyA&s";

function addInLibrary() {
  let artist_library = document.createElement("div");
  artist_library.classList.add("artist_library");
  artists_list.appendChild(artist_library);
  let artist_icon = document.createElement("div");
  artist_icon.classList.add("artist_icon");
  let artist_image = document.createElement("img");
  artist_image.classList.add("artist_library_image");
  artist_image.setAttribute("src", artist_image_source);
  artist_icon.appendChild(artist_image);
  artist_library.appendChild(artist_icon);

  let name_type = document.createElement("div");
  name_type.classList.add("artist_title_sub");
  artist_library.appendChild(name_type);

  let newdiv = document.createElement("div");
  name_type.appendChild(newdiv);

  let artistname = document.createElement("div");
  name_type.appendChild(artistname);
  artistname.classList.add("library_artist_title");
  artistname.innerText = artist_name;

  let artisttype = document.createElement("div");
  name_type.appendChild(artisttype);
  artisttype.classList.add("library_artist_sub");
  artisttype.innerText = artist_type;
}

addInLibrary();

/* songs
 */
let Hauli_Hauli = document.querySelector(".Hauli_Hauli");
let no_cap = document.querySelector(".no_cap");
let likhari_name = document.querySelector(".likhari_name");

let player_source = document.querySelector(
  ".actual_player figure audio source"
);

function start_music(song_name) {
  console.log("call for new song " + song_name);
  set_attribute(player_source, "src", `/songs/${song_name}.mp3`);
  set_attribute(audio_player, "song_name", song_name);
  audio_player.load();
  // audio_player.play();
  play_song.click();
  audio_player.addEventListener("loadedmetadata", () => {
    let time_duration = audio_player.duration;
    update_end_timestamp(time_duration);
    update_range_max(time_duration);
  });

  // update the curr_song
  set_attribute(curr_song_img, "src", `./assets/${song_name}.jpeg`);
  curr_song_name.innerText = song_name;
}

function update_range_max(time) {
  let max = Math.floor(time);
  let element = document.querySelector("#song_range");
  element.setAttribute("max", `${max}`);
}
function update_range(time) {
  let element = document.querySelector("#song_range");
  element.value = Math.floor(time);
}

function update_end_timestamp(time) {
  let x = Math.floor(time);
  let element = document.querySelector("#end_timestamp");
  let minute = Math.floor(x / 60);
  let second = Math.floor(x % 60);
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  element.innerText = `${minute}:${second}`;
}

function update_start_timestamp(time) {
  let x = Math.floor(time);
  let element = document.querySelector("#start_timestamp");
  let minute = Math.floor(x / 60);
  let second = Math.floor(x % 60);

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (second < 10) {
    second = "0" + second;
  }
  element.innerText = `${minute}:${second}`;
}

let play_song = document.querySelector("#play_pause_button");

play_song.addEventListener("click", () => {
  let curr_song_name = audio_player.getAttribute("song_name");
  let play_icon = document.querySelector(`.${curr_song_name} .play_button i`);
  // may be audio is paused
  if (audio_player.paused) {
    audio_player.play();

    remove_class(play_song, "fa-play");
    remove_class(play_song, "player_control_icon");
    add_class(play_song, "fa-pause");

    remove_class(play_icon, "fa-play");
    remove_class(play_icon, "player_control_icon");
    add_class(play_icon, "fa-pause");
  } else {
    audio_player.pause();

    add_class(play_song, "fa-play");
    add_class(play_song, "player_control_icon");
    remove_class(play_song, "fa-pause");

    add_class(play_icon, "fa-play");
    add_class(play_icon, "player_control_icon");
    remove_class(play_icon, "fa-pause");
  }
});

audio_player.addEventListener("timeupdate", () => {
  let start_time = audio_player.currentTime;

  update_start_timestamp(start_time);
  update_range(start_time);
});

song_range.addEventListener("input", () => {
  let currvalue = song_range.value;
  audio_player.currentTime = currvalue;
});

volume_range.addEventListener("input", () => {
  let currvalue = volume_range.value;
  let icon = document.querySelector(".volume_section .volume_icon");
  if (currvalue <= 0.25) {
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-360v-240h160l200-200v640L440-360H280Zm80-80h114l86 86v-252l-86 86H360v80Zm100-40Z"/></svg>`;
  } else if (currvalue <= 0.75 && currvalue > 0.25) {
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-360v-240h160l200-200v640L360-360H200Zm440 40v-322q45 21 72.5 65t27.5 97q0 53-27.5 96T640-320ZM480-606l-86 86H280v80h114l86 86v-252ZM380-480Z"/></svg>`;
  } else if (currvalue == 0) {
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>`;
  } else if (currvalue > 0.75) {
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>`;
  }
  audio_player.volume = currvalue;
});

let play_buttons = document.querySelectorAll(".play_button");

for (let i = 0; i < play_buttons.length; i++) {
  let button = play_buttons[i];

  button.addEventListener("click", () => {
    console.log("song is clicked");
    let curr_song =
      button.parentElement.parentElement.getAttribute("song_name");
    if (
      audio_player.getAttribute("song_name") != button.getAttribute("song_name")
    ) {
      let prev = audio_player.getAttribute("song_name");
      if (!audio_player.paused) {
        play_song.click();
      }
      start_music(curr_song);
    } else {
      play_song.click();
    }
  });
}

function remove_class(element, class_name) {
  element.classList.remove(class_name);
}

function add_class(element, class_name) {
  element.classList.add(class_name);
}

function set_attribute(element, att_name, value) {
  element.setAttribute(att_name, value);
}

let search = document.querySelector(".search");

search.addEventListener("click", () => {
  console.log("search button has been clicked");
});
