import { Component, ChangeEvent } from "react";
import AnnouncementDataService from "../services/announcement.service";
import { Link } from "react-router-dom";
import AnnouncementData from "../types/announcement.type";

type Props = {};

type State = {
    announcements: Array<AnnouncementData>,
    currentAnnouncement: AnnouncementData | null,
    currentIndex: number,
    searchTitle: string
};

export default class AnnouncementsList extends Component<Props, State>{
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
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveAnnouncements();
    }

    onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveAnnouncements() {
        AnnouncementDataService.getAll()
            .then(response => {
                this.setState({
                    announcements: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveAnnouncements();
        this.setState({
            currentAnnouncement: null,
            currentIndex: -1
        });
    }

    setActiveAnnouncement(announcement: AnnouncementData, index: number) {
        this.setState({
            currentAnnouncement: announcement,
            currentIndex: index
        });
    }

    removeAllAnnouncements() {
        AnnouncementDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        this.setState({
            currentAnnouncement: null,
            currentIndex: -1
        });

        AnnouncementDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    announcements: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, announcements, currentAnnouncement, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tutorials List</h4>

                    <ul className="list-group">
                        {announcements &&
                        announcements.map((announcement: AnnouncementData, index: number) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveAnnouncement(announcement, index)}
                                key={index}
                            >
                                {announcement.title}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllAnnouncements}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentAnnouncement? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentAnnouncement.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Code:</strong>
                                </label>{" "}
                                {currentAnnouncement.code}
                            </div>
                            <div>
                                <label>
                                    <strong>Consultant:</strong>
                                </label>{" "}
                                {currentAnnouncement.consultant}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}