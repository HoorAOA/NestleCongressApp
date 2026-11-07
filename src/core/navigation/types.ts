import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Main: undefined;
    QuickAccess: undefined;
    Agenda: undefined;
    Speakers: undefined;
    NameTag: undefined;
    Venue: undefined;
    Voting: undefined;
    AskQA: undefined;
    Resources: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;