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

export interface IArtist {
    id: string,
    name: string,
}

export interface IAlbumsCover {
    height: string,
    width: string,
    url: string,
}
