import http from "../http-common";
import AnnouncementData from "../types/announcement.type";

class AnnouncementDataService {
    getAll() {
        return http.get("/convocatorias")
    }

    get(id: string) {
        return http.get(`/convocatorias/${id}`);
    }

    create(data: AnnouncementData) {
        return http.post("/convocatorias", data);
    }

    update(data: AnnouncementData, id: any) {
        return http.put(`/convocatorias/${id}`, data);
    }

    delete(id: any) {
        return http.delete(`/convocatorias/${id}`);
    }

    deleteAll() {
        return http.delete(`/convocatorias`);
    }

    findByTitle(title: string) {
        return http.get(`/convocatorias?title=${title}`);
    }
}

export default new AnnouncementDataService();