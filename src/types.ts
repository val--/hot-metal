export interface IRelease extends Entity{
    name: string,
    release_date: string,
    album_type: string,
    artists: IArtist[]
    images: IAlbumsCover[]
}

export interface Entity {
    id: string;
}

interface IArtist {
    id: string,
    name: string,
}

interface IAlbumsCover {
    height: string,
    width: string,
    url: string,
}
