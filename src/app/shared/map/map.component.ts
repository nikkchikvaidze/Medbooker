import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Browser, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { environment } from 'src/environments/environment';

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
export class MapComponent implements OnInit, AfterViewInit {
  private map!: Map;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  private initialState = { lng: 50, lat: 49, zoom: 4 };
  private isRetina = Browser.retina;
  private baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${environment.MAP_API_KEY}`;
  private retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${environment.MAP_API_KEY}`;
  private markers: Marker[] = [];

  constructor() {}

  ngAfterViewInit() {
    this.map = map(this.mapContainer?.nativeElement).setView(
      [this.initialState.lat, this.initialState.lng],
      4
    );

    tileLayer(this.isRetina ? this.retinaUrl : this.baseUrl, {
      apiKey: environment.MAP_API_KEY,
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(this.map);
  }

  ngOnInit() {}

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
