import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Browser, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { environment } from 'src/environments/environment';
import { MapCoords } from './map-coords.model';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  private map!: Map;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  @Input() initialState!: MapCoords;
  private isRetina = Browser.retina;
  private baseUrl = `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=${environment.MAP_API_KEY}`;
  private retinaUrl = `https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}@2x.png?apiKey=${environment.MAP_API_KEY}`;
  private markers: Marker[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.map = map(this.mapContainer?.nativeElement).setView(
      [this.initialState.lat, this.initialState.lng],
      this.initialState.zoom
    );

    tileLayer(this.isRetina ? this.retinaUrl : this.baseUrl, {
      apiKey: environment.MAP_API_KEY,
      maxZoom: 20,
      id: 'osm-carto',
    } as any).addTo(this.map);
  }

  setViewCenter(lat: number, lng: number, zoom: number): void {
    this.map.flyTo([lat, lng], zoom, {
      animate: true,
      easeLinearity: 1,
    });
  }

  setMarker(
    lat: number,
    lng: number,
    firstName: string,
    lastName: string
  ): void {
    const newMarker = marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`${firstName} ${lastName}`);
    this.markers.push(newMarker);
  }

  clearMarkers(): void {
    this.markers.forEach((m) => this.map.removeLayer(m));
    this.markers = [];
  }
}
