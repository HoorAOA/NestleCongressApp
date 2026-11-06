import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MapPin, Navigation } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

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
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language.startsWith('ar');

    const venueName = isArabic ? VENUE.nameAr : VENUE.nameEn;
    const venueDates = isArabic ? VENUE.datesAr : VENUE.datesEn;
    const venueAddress = isArabic ? VENUE.addressAr : VENUE.addressEn;
    const venueFacilities = FACILITIES.map(facility => ({
        ...facility,
        label: isArabic ? facility.labelAr : facility.labelEn,
    }));

    return (
        <ScreenLayout
            title={t('quickAccess.venueTitle')}
            onBack={navigation.goBack}
            padded
            headerRight={
                <HeaderIconButton
                    label={t('quickAccess.getDirections')}
                    onPress={() => openDirections()}
                >
                    <Navigation size={20} color={Colors.gold} fill={Colors.gold} />
                </HeaderIconButton>
            }
        >
            <VenueHeroCard name={venueName} dates={venueDates} />

            <InfoTile
                variant="white"
                icon={MapPin}
                label={t('quickAccess.venueAddress')}
                value={venueAddress}
            />

            <MapPreview
                latitude={VENUE.coordinates.latitude}
                longitude={VENUE.coordinates.longitude}
                onPress={() => openDirections()}
                label={t('quickAccess.mapPreview')}
            />

            <FacilitiesCard facilities={venueFacilities} />
        </ScreenLayout>
    );
};

export default VenueScreen;
