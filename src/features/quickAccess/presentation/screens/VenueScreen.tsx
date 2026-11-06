import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MapPin, Navigation } from 'lucide-react-native';

import { Colors } from '../../../../core/theme/colors';
import type { RootNavigationProp } from '../../../../core/navigation/types';
import { openDirections } from '../../../../core/utils/openDirections';
import { FACILITIES, VENUE } from '../../data/quickAccessData';
import {
    FacilitiesCard,
    HeaderIconButton,
    InfoTile,
    MapPreview,
    ScreenLayout,
    VenueHeroCard,
} from '../components';

const VenueScreen = () => {
    const navigation = useNavigation<RootNavigationProp>();

    return (
        <ScreenLayout
            title="Venue"
            onBack={navigation.goBack}
            padded
            headerRight={
                <HeaderIconButton
                    label="Get directions"
                    onPress={() => openDirections()}
                >
                    <Navigation size={20} color={Colors.gold} fill={Colors.gold} />
                </HeaderIconButton>
            }
        >
            <VenueHeroCard name={VENUE.name} dates={VENUE.dates} />

            <InfoTile
                variant="white"
                icon={MapPin}
                iconFilled
                label="Venue Address"
                value={VENUE.address}
            />

            <MapPreview onPress={() => openDirections()} />

            <FacilitiesCard facilities={FACILITIES} />
        </ScreenLayout>
    );
};

export default VenueScreen;
