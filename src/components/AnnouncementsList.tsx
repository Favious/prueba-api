import { Component, ChangeEvent } from "react";
import AnnouncementDataService from "../services/announcement.service";
import { Link } from "react-router-dom";
import AnnouncementData from "../types/announcement.type";

type Props = {};

type State = {
  announcements: Array<AnnouncementData>;
  currentAnnouncement: AnnouncementData | null;
  currentIndex: number;
  searchTitle: string;
};

export default class AnnouncementsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveAnnouncements = this.retrieveAnnouncements.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAnnouncement = this.setActiveAnnouncement.bind(this);
    this.removeAllAnnouncements = this.removeAllAnnouncements.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      announcements: [],
      currentAnnouncement: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.retrieveAnnouncements();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveAnnouncements() {
    AnnouncementDataService.getAll()
      .then((response) => {
        this.setState({
          announcements: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAnnouncements();
    this.setState({
      currentAnnouncement: null,
      currentIndex: -1,
    });
  }

  setActiveAnnouncement(announcement: AnnouncementData, index: number) {
    this.setState({
      currentAnnouncement: announcement,
      currentIndex: index,
    });
  }

  removeAllAnnouncements() {
    AnnouncementDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentAnnouncement: null,
      currentIndex: -1,
    });

    AnnouncementDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          announcements: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, announcements, currentAnnouncement, currentIndex } =
      this.state;

    return (
      <div className="container p-3">
        {announcements &&
          announcements.map((announcement: AnnouncementData, index: number) => (
            <div className="row mx-0 mb-2">
              <div className="col-8 offset-2 btn-info btn-md announcement">
                <div className="row">
                  <div className="col-xs-12 col-md-6 col-lg-4">
                    {announcement.titulo}
                  </div>
                  <div className="col-md-2 col-lg-4 d-none d-lg-block text-end">
                    {announcement.codigo}
                  </div>
                  <div className="col-md-4 col-lg-4 d-none d-md-block text-end">
                    {announcement.consultor}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
