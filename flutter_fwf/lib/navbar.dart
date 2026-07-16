import 'package:flutter/material.dart';
import 'package:flutter_fwf/notifiers.dart';

class NavBarWidget extends StatelessWidget {
  const NavBarWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder(
      valueListenable: selectedPageNotifier,
      builder: (context, selectedPage, child) {
        return NavigationBar(
          labelTextStyle: WidgetStatePropertyAll(
            TextStyle(fontFamily: 'Papyrus', fontWeight: FontWeight.w800),
          ),
          destinations: [
            NavigationDestination(
              icon: Icon(Icons.games_outlined),
              label: 'Game',
            ),
            NavigationDestination(
              icon: Icon(Icons.copyright_rounded),
              label: 'Credits',
            ),
            NavigationDestination(
              icon: Icon(Icons.list_alt_rounded),
              label: 'Sheet',
            ),
          ],
          onDestinationSelected: (int value) {
            selectedPageNotifier.value = value;
          },
          selectedIndex: selectedPage,
        );
      },
    );
  }
}
